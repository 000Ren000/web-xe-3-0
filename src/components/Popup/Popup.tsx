import './Popup.css';
import { FormEvent } from 'react';

export interface PopupProps {
  ins: number;
  opened: boolean;
  handleClose: (e: FormEvent) => void;
}

export const Popup = ({ ins, opened, handleClose }:PopupProps) => {

  console.log(ins);
  return (
    <div className={ `popup ${ opened ? 'popup__opened' : ''}`}>
      <form className="popup__form" onSubmit={handleClose}>
        <h1 className="popup__title mt-2">Результат:</h1>
        <p className="popup__text">{ins} ед</p>
        <div className='flex gap-3 mt-3'>
        <input type="submit" className="popup__btn-accept" value="Закрыть"/>
        </div>
      </form>
    </div>
  )
};
