import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "lodash.debounce";
import useSWR from "swr";
import { fetcherWithToken } from "@/services/api";
import { API_ENDPOINTS } from "@/descubreApi";

const filterSchema = z.object({
  search: z.string().optional(),
  category: z.string().nonempty("Seleccione una categoría"),
  subcategory: z.string().nonempty("Seleccione una subcategoría"),
});

export const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

const useHomeFilters = () => {
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: { search: "", category: "", subcategory: "" },
  });

  const searchValue = watch("search");
  const categoryValue = watch("category");
  const subcategoryValue = watch("subcategory");

  useEffect(() => {
    setValue("subcategory", "");
  }, [categoryValue, setValue]);

  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);

  const debouncedSet = useMemo(() => debounce((value) => setDebouncedSearch(value), 500), []);

  useEffect(() => {
    debouncedSet(searchValue);
  }, [searchValue, debouncedSet]);

  const {
    data: rawData,
    error,
    isLoading,
  } = useSWR(() => {
    const params = new URLSearchParams({
      ordering: "closestdate",
      search: debouncedSearch || "",
      typeId: categoryValue || "",
      categoryId: subcategoryValue || "",
    }).toString();
    return `${API_ENDPOINTS.GET_OFFER_AVAILABLE}?${params}`;
  }, fetcherWithToken);

  const data = useMemo(() => {
    if (!rawData || rawData.isSuccess !== true) {
      if (rawData && rawData.isSuccess !== true) {
        console.error("La respuesta del API no fue exitosa:", rawData);
      }
      return [];
    }
    return rawData.result || [];
  }, [rawData]);

  const handleSetValue = (name, value) => {
    setValue(name, value);
  };

  const onSubmit = (formData) => console.log("Formulario enviado:", formData);

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
    data,
    error,
    isLoading,
    watch,
    handleSetValue,
    values: {
      searchValue,
      categoryValue,
      subcategoryValue,
    },
  };
};

export default useHomeFilters;
