import { useEffect } from "react";
import styles from "./catalog.module.scss"
import PizzaCard from "../components/PizzaCard";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getPizzasList } from "../store/ActionCreators";

function PizzaCatalog() {
  const dispatch = useAppDispatch();
  const {pizzas, isLoading, error} = useAppSelector(state => state.pizzaStore);

  useEffect(() => {
    dispatch(getPizzasList());
    console.log(error);
  }, []);
    
  return (
    <>
      {isLoading ? (
        <div style={{display:"flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
          <svg className={styles.spinner} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle className={styles.path} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
          </svg>
        </div>
      ) : (
        <div className={styles.container}>
          {pizzas.map((pizza) => (
            <PizzaCard
              key={pizza.id}  
              image={pizza.img}
              title={pizza.name}
              description={pizza.description}
              cost={pizza.sizes[0].price}
            />
          ))}
        </div>
    )}
    </>
  )
}

export default PizzaCatalog;
