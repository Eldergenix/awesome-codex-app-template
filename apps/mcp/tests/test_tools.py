from server import draft_notion_progress


def test_draft_notion_progress() -> None:
    result = draft_notion_progress("Task", "In Progress", "Working")
    assert result["database"] == "progress"
    assert result["status"] == "In Progress"
