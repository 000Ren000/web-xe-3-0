import { useEffect, useState } from 'react';
import '../components/Form/Form.css';
import { Popup } from '../components/Popup/Popup';
import Union from '../images/Union.svg';

interface FormData {
  Carbohydrates: string;
  Weight: string;
}

export const PageCalcFinishedProduct = () => {
  const [form, setForm] = useState<FormData>({
    Carbohydrates: '',
    Weight: '',
  });
  const [ins, setIns] = useState<number>(0);
  const [popupOpened, setPopupOpened] = useState<boolean>(false);

  const closePopup = (e: React.FormEvent) => {
    e.preventDefault();
    setPopupOpened(false);
  };

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    const { Carbohydrates, Weight } = form;

    // Проверяем, что значения не пустые
    if (Carbohydrates && Weight) {
      const carbs = parseFloat(Carbohydrates);
      const weight = parseFloat(Weight);

      // Проверяем, что значения валидные числа
      if (!isNaN(carbs) && !isNaN(weight) && carbs > 0 && weight > 0) {
        const xe = ((carbs / 100) * weight) / 12;
        setIns(Math.round(xe * 1.5 * 100) / 100);
      } else {
        setIns(0);
      }
    } else {
      setIns(0);
    }

    if (e) {
      e.preventDefault();
      // Очищаем форму
      setForm({
        Carbohydrates: '',
        Weight: '',
      });
      setPopupOpened(true);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [form]);

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form__input-conteiner'>
          <input
            type='number'
            className='form__input'
            placeholder='Углеводов на 100г'
            name='Carbohydrates'
            value={form.Carbohydrates}
            onChange={changeForm}
            min="0"
            step="0.1"
          />
          <input
            type='number'
            className='form__input'
            placeholder='Вес продукта'
            name='Weight'
            value={form.Weight}
            onChange={changeForm}
            min="0"
            step="0.1"
          />
          <button type='submit' className='form__button'>
            Рассчитать
          </button>
        </div>
        <span className='form__result'>{ins} ед</span>
        <div
          className='form__image-bottom'
          style={{
            backgroundImage: `url(${Union})`,
          }}
        />
      </form>
      <Popup ins={ins} opened={popupOpened} handleClose={closePopup} />
    </>
  );
};
