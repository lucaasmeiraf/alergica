from fastapi import APIRouter, HTTPException, Header
from typing import Any, Dict, List, Optional

from ..db import get_db

router = APIRouter(prefix="/medications")

MEDICATION_LIST_FIELDS = "id, name, laboratory, risk_level, risk_description"
MEDICATION_DETAIL_FIELDS = (
    "*, medication_ingredients("
    "id, is_excipient, quantity, notes, "
    "ingredients(id, name, is_allergen, notes, allergen_groups(id, name, code))"
    ")"
)


def _token(authorization: str) -> str:
    return authorization.removeprefix("Bearer ").strip()


@router.get("/search", response_model=List[Dict[str, Any]])
def search_medications(
    q: str = "",
    limit: int = 12,
    authorization: str = Header(...),
) -> List[Dict[str, Any]]:
    """Search medications by name or active substance.

    When q is empty, returns the 6 most-accessed medications.
    """
    db = get_db(_token(authorization))

    if not q.strip():
        res = (
            db.table("medications")
            .select(MEDICATION_LIST_FIELDS)
            .order("access_count", desc=True)
            .limit(6)
            .execute()
        )
    else:
        res = (
            db.table("medications")
            .select(MEDICATION_LIST_FIELDS)
            .or_(f"name.ilike.%{q}%,active_substance.ilike.%{q}%")
            .limit(limit)
            .execute()
        )

    return res.data or []


@router.get("/{medication_id}", response_model=Dict[str, Any])
def get_medication(
    medication_id: str,
    authorization: str = Header(...),
) -> Dict[str, Any]:
    """Return full medication details including ingredient composition."""
    db = get_db(_token(authorization))

    res = (
        db.table("medications")
        .select(MEDICATION_DETAIL_FIELDS)
        .eq("id", medication_id)
        .single()
        .execute()
    )

    if not res.data:
        raise HTTPException(status_code=404, detail="Medicamento não encontrado")

    return res.data


@router.post("/{medication_id}/view")
def record_view(
    medication_id: str,
    authorization: str = Header(...),
) -> Dict[str, str]:
    """Increment the access_count for a medication (fire-and-forget)."""
    db = get_db(_token(authorization))
    try:
        db.rpc("increment_medication_access", {"med_id": medication_id}).execute()
    except Exception:
        # Non-critical — never block the response if the counter fails
        pass
    return {"ok": "true"}
