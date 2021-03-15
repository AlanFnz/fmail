export const RemoveEmailRequest = () => {
  const request = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return request;
};
