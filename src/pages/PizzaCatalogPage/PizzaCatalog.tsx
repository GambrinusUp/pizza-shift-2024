import { useEffect } from "react";

import styles from "./catalog.module.scss";

import PizzaCard from "../../components/PizzaCard/PizzaCard";
import PizzaModal from "../../components/PizzaModal/PizzaModal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useModal from "../../hooks/useModal";
import { getPizzasList } from "../../store/ActionCreators";
import { selectPizza, setSelectDough, setSelectSize } from '../../store/PizzaSlice';

function PizzaCatalog() {
  const dispatch = useAppDispatch();
  const {pizzas, isLoading, error} = useAppSelector(state => state.pizzaStore);
  const { isOpen, toggle } = useModal();

  useEffect(() => {
    dispatch(getPizzasList());
    console.log(error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.svg_container}>
          <svg className={styles.loader} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
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
              addPizzaToCart={() => {
                toggle(); 
                dispatch(selectPizza(pizza));
                dispatch(setSelectSize({ name: (pizza.sizes[0].name), price: pizza.sizes[0].price }));
                dispatch(setSelectDough({ name: (pizza.doughs[0].name), price: pizza.doughs[0].price }));
              }}
            />
          ))}
          <PizzaModal isOpen={isOpen} toggle={toggle} type="add" />
        </div>
      )}
    </>
  )
}

export default PizzaCatalog;
