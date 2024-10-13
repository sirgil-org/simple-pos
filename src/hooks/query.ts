import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabase_client";
import { QueryProps } from "../types";
import { useCurrentUser } from "../contexts";

export default function useQuery<T>({
  is_single = false,
  table,
  from = 0,
  to = 10,
  filter,
  order = { column: "created_at", ascending: true },
  cb,
}: QueryProps): {
  loading: boolean;
  data: T;
  error?: string;
  refresh: () => any;
  search: (text: string) => any;
  count: number;
} {
  const { currentUser } = useCurrentUser();

  const getData = useCallback(async () => {
    setLoading(true);
    const { data, error, count } = is_single
      ? await supabase
          .from(table)
          .select(filter)
          .limit(1)
          .eq("vendor_id", currentUser?.id)
          .single()
      : await supabase
          .from(table)
          .select(filter, { count: "exact" })
          .range(from as number, to as number)
          .eq("vendor_id", currentUser?.id)
          .order(order.column, { ascending: order.ascending });
    setLoading(false);

    if (data) {
      setData(data as T);
      setCount(count as number);

      if (cb) {
        cb(data);
      }
    }
    if (error) {
      setError(error.message);
    }
  }, [
    cb,
    currentUser?.id,
    filter,
    from,
    is_single,
    order.ascending,
    order.column,
    table,
    to,
  ]);

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    getData();
  }, [from, getData, to]);

  const search = async (searchText: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select(filter)
      .or(searchText);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setData(data as T);
    return data;
  };

  const refresh = async () => getData();

  return { data: data as T, loading, error, refresh, search, count };
}
