import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [userData, setUserData] = useState([]);
  const [id, setId] = useState();
  const [isUpdate, setIsUpdate] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add user
    const data = await axios.post("/create", formData);
    console.log("data", data);
    if (data.data.success) {
      setIsFormVisible(false);
      alert(data.data.message);
    }
    getFetchedData();
  };

  // get the data
  const getFetchedData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      setUserData(data.data.data);
    }
  };

  console.log("userdata", userData);

  useEffect(() => {
    getFetchedData();
  }, []);

  // delete user

  const handleDelete = async (id) => {
    const data = await axios.delete(`/delete/${id}`);
    console.log(id);
    alert(data.data.message);
    getFetchedData();
  };

  // update user

  const handleUpdate = async (id) => {
    const data = await axios.put(`/update/${id}/?id=${id}`, formData);
    console.log("update", data);
    alert(data.data.message);
  };

  const handleUpdateCard = (id) => {
    console.log("id", id);
    setId(id);
    setIsFormVisible(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="w-full max-w-full h-full min-h-[100vh] bg-amber-100 p-3 mx-auto rounded-md ">
        <button
          onClick={() => {
            setIsFormVisible(!isFormVisible), setIsUpdate(false);
          }}
          className="px-6 py-2 bg-indigo-800 text-white text-sm font-normal rounded-full cursor-pointer hover:bg-indigo-500 border-none"
        >
          Add user
        </button>
        {isFormVisible && (
          <div className="absolute w-1/3  z-10 top-1/3 left-1/3 bg-transparent">
            <form
              className="flex flex-col bg-green-200 p-4"
              onSubmit={handleSubmit}
            >
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="mobile">Mobile: </label>
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              {isUpdate ? (
                <button
                  className="px-6 py-2 bg-indigo-800 text-white text-sm font-normal rounded-full cursor-pointer hover:bg-indigo-500 border-none mt-2"
                  onClick={() => handleUpdate(id)}
                >
                  Update
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-800 text-white text-sm font-normal rounded-full cursor-pointer hover:bg-indigo-500 border-none mt-2"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        )}

        <div className="flex w-full flex-wrap justify-center items-center mt-16">
          {userData.map((item) => {
            return (
              <div
                key={item._id}
                className="w-[20rem] h-[10rem] bg-slate-950 flex m-4 justify-between items-center p-6 rounded-md"
              >
                <div className="text-white">
                  <p>Name: {item.name}</p>
                  <p>Email: {item.email}</p>
                  <p>Mobile: {item.mobile}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    className="px-6 py-2 bg-indigo-800 text-white text-sm font-normal rounded-full cursor-pointer hover:bg-indigo-500 border-none mt-2"
                    onClick={() => handleUpdateCard(item._id)}
                  >
                    update
                  </button>
                  <button
                    className="px-6 py-2 bg-indigo-800 text-white text-sm font-normal rounded-full cursor-pointer hover:bg-indigo-500 border-none mt-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
