import { useState } from "react";
import axios from "axios";

function Upload() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: null,
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("image", form.image);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );

      console.log(res.data);
      alert("User Registered!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <br /><br />

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br /><br />

      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <br /><br />

      <input type="file" name="image" onChange={handleChange} />
      <br /><br />

      {preview && <img src={preview} alt="preview" width="150" />}

      <br /><br />

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Upload;