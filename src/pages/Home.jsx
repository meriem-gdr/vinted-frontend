import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = ({ priceAsc, title, priceMax }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const limit = 10;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers?priceMin=0&priceMax=${priceMax}&sort=${
            priceAsc ? "price-asc" : "price-desc"
          }&title=${title}&limit=${limit}&page=${page}`
        );
        console.log("response.data", response.data);
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page, priceAsc, title, priceMax]);

  if (isLoading) {
    return <p className="loader">En cours de chargement...</p>;
  }

  return (
    <main>
      <div className="offers-grid">
        {data.offers.map((offer) => {
          // console.log(offer);
          return (
            <Link to={`/offers/${offer._id}`} key={offer._id}>
              <article>
                <div className="card-container">
                  {offer.owner.account.avatar && (
                    <img
                      style={{
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      src={offer.owner.account.avatar?.secure_url}
                      alt={offer.owner.account.username}
                    />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
                <div>
                  <img
                    style={{
                      height: "300px",
                    }}
                    src={offer.product_image.secure_url}
                    alt={offer.product_name}
                  />
                </div>
                <div>
                  <p>{offer.product_price} €</p>
                  <p>{offer.product_details[1].TAILLE}</p>
                  <p>{offer.product_details[0].MARQUE}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prevPage) => prevPage - 1)}
        >
          Précédent
        </button>
        <span>Page {page}</span>
        <button
          disabled={data.count <= page * limit}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Suivant
        </button>
      </div>
    </main>
  );
};

export default Home;
