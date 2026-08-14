import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { SpinnerIcon, StarIcon } from "@/design-system/icons";
import type { User } from "@/types/user";

import { PAGE_SIZE } from "../../utils/format";
import AssetRow from "./AssetRow";
import { DELETE_ASSET, GET_USER } from "./queries";

interface UserCardProps {
  userId: string;
}

enum AssetState {
  Draft = "draft",
  Ready = "ready",
}

const formatCredits = (credits: number) => `${credits.toLocaleString("en-US")} credits`;

const UserCard = ({ userId }: UserCardProps) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [deletedCount, setDeletedCount] = useState(0);

  const { data } = useQuery<{ user: User }>(GET_USER, {
    variables: { id: userId },
  });
  const [deleteAsset] = useMutation(DELETE_ASSET);

  const user = data!.user;
  const assets = user.assets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const handleDelete = async (id: string) => {
    await deleteAsset({ variables: { id } });
    setDeletedCount(deletedCount + 1);
  };

  return (
    <section>
      <header>
        <img src={user.profile.avatarUrl} alt="" />
        <h2>{user.profile.displayName}</h2>
        <p>{formatCredits(user.credits)}</p>
        <p>
          Last synced at {new Date().toLocaleTimeString()} · {deletedCount} removed
        </p>
      </header>

      <ul>
        {assets.map((asset) => (
          <AssetRow
            key={asset.id}
            asset={asset}
            state={AssetState.Ready}
            onDelete={() => handleDelete(asset.id)}
          />
        ))}
      </ul>

      <button type="button" onClick={() => setPage(page + 1)}>
        Load more
      </button>

      {!data && <SpinnerIcon />}
      <StarIcon />
    </section>
  );
};

export default UserCard;
