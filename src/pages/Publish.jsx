import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ userToken }) => {
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("0");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", state);
      formData.append("city", location);
      formData.append("barnd", size);
      formData.append("color", color);
      formData.append("picture", picture);

      console.log("formData", formData);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      navigate(`/offers/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return userToken ? (
    <form className="signup-container">
      <div className="file-container">
        <label style={{ color: "#35bba0" }} htmlFor="file">
          + {picture ? "Changer" : "Ajouter"} une photo
        </label>
        <input
          id="file"
          type="file"
          onChange={(e) => {
            console.log("file", e.target.files[0]);

            setPicture(e.target.files[0]);
          }}
        />
      </div>

      {picture && (
        <img
          src={URL.createObjectURL(picture)}
          alt="product"
          width={50}
          height={50}
        />
      )}

      <input
        value={title}
        type="text"
        placeholder="Titre"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div>
        <textarea
          value={description}
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      </div>

      <input
        value={brand}
        type="text"
        placeholder="Marque"
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      />
      <input
        value={size}
        type="text"
        placeholder="Taille"
        onChange={(e) => {
          setSize(e.target.value);
        }}
      />
      <input
        value={color}
        type="text"
        placeholder="Couleur"
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />
      <input
        value={state}
        type="text"
        placeholder="Etat"
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
      <input
        value={location}
        type="text"
        placeholder="Lieu"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <input
        value={price}
        type="number"
        placeholder="Prix"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <label>prix en EUR</label>
      <button style={{ color: "#35bba0" }} onClick={handleSubmit}>
        {" "}
        Ajouter{" "}
      </button>
    </form>
  ) : (
    <Navigate to="/login" />
  );
};
export default Publish;
