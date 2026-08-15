import type { UserAsset } from "@/types/user";

interface AssetRowProps {
  asset: UserAsset;
  state: string;
  onDelete: () => void;
}

const AssetRow = ({ asset, state, onDelete }: AssetRowProps) => (
  <li>
    <span>{asset.title}</span>
    <span>{state}</span>
    <button type="button" onClick={onDelete}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 5h10M6.5 5V3.5h3V5M5 5l.7 8h4.6L11 5" stroke="currentColor" />
      </svg>
      Delete
    </button>
  </li>
);

export default AssetRow;
