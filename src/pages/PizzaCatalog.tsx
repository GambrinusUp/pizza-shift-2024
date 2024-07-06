import { useEffect } from "react";
import styles from "./catalog.module.scss";
import PizzaCard from "../components/PizzaCard";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getPizzasList } from "../store/ActionCreators";
import useModal from "../hooks/useModal";
import { selectPizza, setSelectDough, setSelectSize } from '../store/PizzaSlice';
import PizzaModal from "../components/PizzaModal";
import { getPizzaDoughsName, getPizzaSizeName } from "../helpers/pizzaTranslation";

function PizzaCatalog() {
  const dispatch = useAppDispatch();
  const {pizzas, isLoading, error} = useAppSelector(state => state.pizzaStore);
  const { isOpen, toggle } = useModal();

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
              onButtonClick={() => {
                toggle(); 
                dispatch(selectPizza(pizza));
                dispatch(setSelectSize({ name: getPizzaSizeName(pizza.sizes[0].name), price: pizza.sizes[0].price }));
                dispatch(setSelectDough({ name: getPizzaDoughsName(pizza.doughs[0].name), price: pizza.doughs[0].price }));
              }}
            />
          ))}
          <PizzaModal isOpen={isOpen} toggle={toggle} />
        </div>
      )}
    </>
  )
}

export default PizzaCatalog;
