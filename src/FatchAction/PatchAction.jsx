
import toast from 'react-hot-toast';

const PatchAction = (url, data,refetch) => {

    fetch(url, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((data) => {
          if (!!data) {
            toast.success(data?.message);
            refetch();
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });
};

export default PatchAction;