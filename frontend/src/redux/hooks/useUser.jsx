//Vi du ve hooks
import { useEffect, useState } from "react";
import { getUserById } from "@/services/user.api";

const useUser = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(id).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [id]);
  return { user, loading };
};

export default useUser;