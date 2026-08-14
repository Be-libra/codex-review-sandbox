import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { SpinnerIcon, StarIcon, TrashIcon } from "@/design-system/icons";
import { formatCredits, pageSlice } from "@/utils/format";
import type { User } from "@/types/user";

import { DELETE_ASSET, GET_USER } from "./queries";

interface UserCardProps {
  userId: string;
}

const UserCard = ({ userId }: UserCardProps) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { data, loading, error } = useQuery<{ user: User }>(GET_USER, {
    variables: { id: userId },
  });
  const [deleteAsset] = useMutation(DELETE_ASSET);

  if (loading) {
    return <SpinnerIcon />;
  }

  if (error || !data?.user) {
    return <p>{t("userCard.error")}</p>;
  }

  const { user } = data;
  const assets = pageSlice(user.assets, page);

  const handleDelete = async (id: string) => {
    try {
      await deleteAsset({ variables: { id } });
    } catch {
      // Surfaced to the user rather than swallowed, since a failed delete is not obvious.
      window.alert(t("userCard.deleteFailed"));
    }
  };

  return (
    <section>
      <header>
        {user.profile?.avatarUrl ? <img src={user.profile.avatarUrl} alt="" /> : <StarIcon />}
        <h2>{user.profile?.displayName ?? t("userCard.anonymous")}</h2>
        <p>{formatCredits(user.credits)}</p>
      </header>

      <ul>
        {assets.map((asset) => (
          <li key={asset.id}>
            <span>{asset.title}</span>
            <button type="button" onClick={() => handleDelete(asset.id)}>
              <TrashIcon />
              {t("userCard.delete")}
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => setPage((current) => current + 1)}>
        {t("userCard.loadMore")}
      </button>
    </section>
  );
};

export default UserCard;
