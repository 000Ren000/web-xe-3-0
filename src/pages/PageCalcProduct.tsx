import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import '../components/Form/Form.css';
import { Popup } from '../components/Popup/Popup.tsx';
import { getFoodsLocal, getProducts, iFood, iFormData } from '../utils/utils';
import { ProductForm } from '../components/ProductForm/ProductForm.js';
import { Dialog } from '@headlessui/react';
import {TableCalcIns} from "../components/TableCalcIns/TableCalcIns.tsx";

export interface ICalcProduct {
  ins: number;
  finishedWeight: number;
  dryWeight: number;
}

export const PageCalcProduct = () => {
  const [foods, setFoods] = useState<iFood[]>(getFoodsLocal);

  const [form, setForm] = useState<iFormData>({
    carbohydrates: '73.8', // Угливоды
    dryWeight: '', // Вес сухого продукта
    finishedProductWeight: '', // Вес готового продукта
  });

  const [calcProducts, setCalcProducts] = useState<ICalcProduct[]>([]);
  // @ts-ignore
  const [ins, setIns] = useState<number>(0);
  const [popupOpened, setPopupOpened] = useState<boolean>(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState<boolean>(false);

  useEffect(() => {
    getProducts(setFoods);
  }, []);

  const closePopup = (e: React.FormEvent) => {
    e.preventDefault();
    setPopupOpened(false);
    setIsProductFormOpen(false);
  };
  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const changeInputValue = (e: React.MouseEvent, valueInInput: number) => {
    e.preventDefault();
    const input = (e.target as HTMLElement)
      .parentElement!.parentElement!.querySelector('.form__input') as HTMLInputElement;
    input.value = valueInInput.toString();
    setForm({ ...form, dryWeight: valueInInput.toString() });
  };

  const changeSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carbohydrates = (e.target as HTMLElement)
      .parentElement!.parentElement!.querySelector('#carbohydrates') as HTMLInputElement;
    carbohydrates.value = e.target.value;
    setForm({ ...form, carbohydrates: carbohydrates.value });
  };

  // const handleSubmit = (e: React.MouseEvent, edIns: number) => {
  //   const { carbohydrates, dryWeight, finishedProductWeight } = form;
  //   const xe = ((parseFloat(carbohydrates) / 100) * parseFloat(dryWeight)) / 12;
  //   const result = Math.round(((parseFloat(finishedProductWeight) / xe) * edIns) / 1.5);
  //   console.log(xe);
  //   setIns(result);
  //   if (e !== null) {
  //     e.preventDefault();
  //     (e.target as HTMLElement)
  //       .querySelectorAll('.form__input')
  //       .forEach((item) => ((item as HTMLInputElement).value = ''));
  //     setPopupOpened(true);
  //   }
  // };

  const changeElement = (newValueText: string) => {
    const selectElement = document.querySelector('#foodsList') as HTMLSelectElement;
    for (let option of selectElement.options) {
      if (option.text === newValueText) {
        console.log(selectElement.value);

        selectElement.value = option.value;
        selectElement.dispatchEvent(new Event('change'));
        break;
      }
    }
  };

  const handleCalcProduct = (e: React.MouseEvent):void => {
    const { carbohydrates, dryWeight, finishedProductWeight } = form;
    const xe = ((parseFloat(carbohydrates) / 100) * parseFloat(dryWeight)) / 12;
    const res:ICalcProduct[] = []
    for (let i: number = 3; i <=5; i++) {
      const finishedWeight: number = Math.round(((parseFloat(finishedProductWeight) / xe) * i) / 1.5)
      res.push({
        ins: i,
        finishedWeight: finishedWeight,
        dryWeight: Math.round(((parseFloat(dryWeight) / parseFloat(finishedProductWeight)) * finishedWeight)),
      });
    }
    setCalcProducts(res)
    if (e !== null) {
      e.preventDefault();
      setPopupOpened(false);
    }
  }
  return (
    <>
      <form className='form'>
        <div className='form__input-conteiner'>
          <input
            type='text'
            className='form__input'
            placeholder='Вес сухого продукта'
            name='dryWeight'
            onChange={changeForm}
          />
          <div className='form__button-container'>
            <button
              className='form__button_mini'
              onClick={(e) => changeInputValue(e, 200)}
            >
              200
            </button>
            <button
              className='form__button_mini'
              onClick={(e) => changeInputValue(e, 300)}
            >
              300
            </button>
            <button
              className='form__button_mini'
              onClick={(e) => changeInputValue(e, 400)}
            >
              400
            </button>
          </div>
          <input
            id='weight'
            type='text'
            className='form__input'
            placeholder='Вес готового продукта'
            name='finishedProductWeight'
            onChange={changeForm}
          />
          <div className='form__input_m'>
            <input
              id='carbohydrates'
              type='text'
              className='form__input'
              placeholder='Углеводы в 100г'
              onChange={changeForm}
              name='carbohydrates'
              value={form.carbohydrates}
            />
            <select
              id='foodsList'
              className='form__list'
              onChangeCapture={changeSelectValue}
            >
              {foods.map((food, id) => (
                <option key={id} value={food.carbohydrates}>
                  {food.name}
                </option>
              ))}
            </select>
            <PlusIcon
              onClick={() => setIsProductFormOpen(true)}
              className='form__button_add'
            />
          </div>
          <div className='form__button-container_m'>
            <button className='form__button' onClick={handleCalcProduct}>Расчитать</button>
          </div>
        </div>
        {
         calcProducts.length > 0 && <TableCalcIns calcProduct={calcProducts} />
        }
      </form>
      <Popup ins={ins} opened={popupOpened} handleClose={closePopup} />
      <Dialog open={isProductFormOpen} onClose={() => setIsProductFormOpen(false)}>
        <ProductForm
          handleClose={() => setIsProductFormOpen(false)}
          formData={form}
          setFormData={setForm}
          changeElement={changeElement}
        />
      </Dialog>
    </>
  );
};
