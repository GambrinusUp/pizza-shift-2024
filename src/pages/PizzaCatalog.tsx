import { useState, useEffect } from "react";
import { pizzaAPI } from "../api/pizzaAPI";
import styles from "./catalog.module.scss"
import PizzaCard from "../components/PizzaCard";
import { Pizza, PizzaArray } from "../types";

function PizzaCatalog() {
    const [catalog, setCatalog] = useState<Pizza[]>([]);

    useEffect(() => {
        async function fetchCatalog() {
          try {
            const data: PizzaArray = await pizzaAPI.getCatalog();
            setCatalog(data.catalog);
          } catch (error) {
            console.error("Failed to fetch catalog", error);
          }
        }
    
        fetchCatalog();
      }, []);
    
    return (
        <div className={styles.container}>
            {catalog.map((pizza) => (
              <PizzaCard
                key={pizza.id}  
                image={pizza.img}
                title={pizza.name}
                description={pizza.description}
                cost={pizza.sizes[0].price}
              />
            ))}
        </div>
    )
}

export default PizzaCatalog;
