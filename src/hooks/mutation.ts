import { useState } from "react";
import { supabase } from "../supabase_client";

export default function useMutation() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const insert = async (table: string, fields: any) => {
    setLoading(true);
    const { data, status, statusText, error } = await supabase
      .from(table)
      .insert(fields)
      .select();
    setLoading(false);
    if (error) {
      setError(error.message);
      return { data: null, error: error };
    }
    setData({ status, statusText, ...data });
    return { data, error: null };
  };

  const update = async (table: string, _id: number, fields: any) => {
    setLoading(true);
    const { status, statusText, error } = await supabase
      .from(table)
      .update(fields)
      .eq("id", _id)
      .select();
    setLoading(false);
    if (error) {
      setError(error.message);
      return { data: null, error };
    }
    setData({ status, statusText });
    return { data: { status, statusText }, error: null };
  };

  const upsert = async (table: string, _id: number, fields: JSON) => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .upsert({ id: 1, ...fields })
      .select();
    setLoading(false);
    if (error) {
      setError(error.message);
      return { data: null, error };
    }
    setData(data);
    return { data, error: null };
  };

  const onDelete = async (table: string, _id: number) => {
    setLoading(true);
    const { status, statusText, error } = await supabase
      .from(table)
      .delete()
      .eq("id", _id);
    setLoading(false);
    if (error) {
      setError(error.message);
      return { data: null, error };
    }
    setData({ status, statusText });
    return { data: { status, statusText }, error: null };
  };

  return { data, loading, error, insert, update, upsert, onDelete };
}
