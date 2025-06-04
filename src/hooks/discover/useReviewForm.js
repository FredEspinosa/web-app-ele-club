import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const filterSchema = z.object({
  rate: z.number({ required_error: 'La calificación es obligatoria' })
  .int('Debe ser un número entero')
  .min(0, 'La calificación mínima es 0')
  .max(5, 'La calificación máxima es 5'),
  opinion: z.string().optional(),
});

const rateLabels = ['Muy malo','Malo','Regular','Bueno','Muy bueno','Excelente']

const useReviewForm = () => {
  const {
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: { rate: 0, opinion: '' },
  });

  const ratingValue = watch('rate');
  const opinionValue = watch('opinion');

  const handleSetValue = (name, value) => {
    setValue(name, value);
  };

  const onSubmit = () =>
    console.log('Formulario enviado:', { ratingValue, opinionValue });

  const rateLabel = useMemo(() => {
    if (!ratingValue) return rateLabels[0];
    return rateLabels[ratingValue]
  }, [ratingValue])

  return {
    errors,
    values: {
      ratingValue,
      opinionValue
    },
    onSubmit,
    handleSetValue,
    handleSubmit,
    watch,
    rateLabel
  };
};

export default useReviewForm;
