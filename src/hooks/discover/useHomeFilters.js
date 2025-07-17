import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "lodash.debounce";
import useSWR from "swr";
import { fetcherWithToken } from "@/services/api";
import { API_ENDPOINTS } from "@/descubreApi";
import { OFFERS_TYPE_IDS } from "@/constants/offersType";


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
      search: debouncedSearch || "",
      typeId: categoryValue || "",
      categoryId: subcategoryValue || "",
    }).toString();
    return `${API_ENDPOINTS.GET_OFFER_AVAILABLE}?${params}`;
  }, fetcherWithToken);

  // const data = useMemo(() => {
  //   const offersArray = rawData?.result || [];
  //   if (!Array.isArray(offersArray)) {
  //     console.error("rawData.result no es un arreglo. Valor actual:", rawData);
  //     return { eventos: [], servicios: [] };
  //   }
  //   return offersArray.reduce(
  //     (acc, item) => {
  //       try {
  //         const formData = JSON.parse(item.formDataJson);
  //         const finalObject = { ...item, ...formData };
  //         delete finalObject.formDataJson;
  //         if (item.offerTypeId === OFFERS_TYPE_IDS.SERVICIO) {
  //           acc.servicios.push(finalObject);
  //         } else if (item.offerTypeId === OFFERS_TYPE_IDS.EVENTO) {
  //           acc.eventos.push(finalObject);
  //         }
  //       } catch (e) {
  //         console.error("Error al parsear formDataJson:", e);
  //       }

  //       return acc;
  //     },
  //     { eventos: [], servicios: [] }
  //   );
  // }, [rawData]);

  const data = useMemo(() => {
    const eventos = rawData?.result?.evento || [];
    const servicios = rawData?.result?.servicio || [];

    const allOffers = [...eventos, ...servicios];

    const result = {
      eventos: [],
      servicios: []
    };

    for (const item of allOffers) {
      try {
        if (!item.formDataJson) {
          console.warn("formDataJson vacío o undefined en item:", item);
          continue;
        }

        const formData = JSON.parse(item.formDataJson);
        const finalObject = { ...item, ...formData };
        delete finalObject.formDataJson;

        if (item.offerTypeId === OFFERS_TYPE_IDS.SERVICIO) {
          result.servicios.push(finalObject);
        } else if (item.offerTypeId === OFFERS_TYPE_IDS.EVENTO) {
          result.eventos.push(finalObject);
        }
      } catch (e) {
        console.error("Error al parsear formDataJson:", e, item);
      }
    }

    return result;
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
