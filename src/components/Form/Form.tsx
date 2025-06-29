import './Form.css';
import Union from '../../images/Union.svg';

export const Form = () => (
  <>
    <form className='form'>
      <div className='form__input-conteiner'>
        <input
          type='number'
          className='form__input'
          placeholder='Угливодов на 100г'
          name='Carbohydrates'
        />
        <input
          type='number'
          className='form__input'
          placeholder='Вес продукта'
          name='Weight'
        />
        <input type='submit' className='form__button' value='Расчитать ggg' />
      </div>
      <span className='form__result'>{0} ед</span>
      <div
        className='form__image-bottom'
        style={{
          backgroundImage: `url(${Union})`,
        }}
      />
    </form>
  </>
);
