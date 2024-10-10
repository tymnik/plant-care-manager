type CreateFormDataProps = {
  data: { [key: string]: string };
};

export const createFormData = ({ data }: CreateFormDataProps) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return formData;
};
