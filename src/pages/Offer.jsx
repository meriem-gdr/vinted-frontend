import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <p className="loader">En cours de chargement...</p>;
  }

  console.log("data.product_details", data.product_details);

  return (
    <main className="main-offer">
      <div className="image-offer">
        <img
          className="product-image"
          src={data.product_image.secure_url}
          alt={data.product_name}
        />
      </div>
      <div className="details-description">
        <p className="product-price">{data.product_name}</p>
        <p className="product-price">{data.product_description}</p>
        <p className="product-price">{data.product_price} €</p>

        {data.product_details.map((detail, index) => {
          const keys = Object.keys(detail);
          const key = keys[0];

          if (!detail[key]) return;

          return (
            <p className="product-details" key={index}>
              <span style={{ fontWeight: "bold", color: "#333" }}>{key}</span> :{" "}
              {detail[key]}
            </p>
          );
        })}

        <Link to="/payment" state={{ data }}>
          <button>Acheter</button>
        </Link>
      </div>
    </main>
  );
};

export default Offer;
