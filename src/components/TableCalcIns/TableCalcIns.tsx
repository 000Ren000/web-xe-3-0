import {ICalcProduct} from "../../pages/PageCalcProduct.tsx";

interface Props {
  calcProduct: ICalcProduct[];
}

export const TableCalcIns = ({calcProduct}: Props) => {
  return (
    <div className="grid grid-cols-3 gap-x-1 text-center text-slate-200 text-sm">
      {/* Колонка: Инсулин */}
      <div className="flex flex-col gap-y-1">
        <div className="bg-slate-700 p-2 rounded-md font-semibold">Инсулин</div>
        {calcProduct.map((item, index) => (
          <div key={index} className="bg-slate-700/50 p-2 rounded-md">
            {item.ins} ед
          </div>
        ))}
      </div>

      {/* Колонка: Готовый продукт */}
      <div className="flex flex-col gap-y-1">
        <div className="bg-slate-700 p-2 rounded-md font-semibold">Готовый</div>
        {calcProduct.map((item, index) => (
          <div key={index} className="bg-slate-700/50 p-2 rounded-md">
            {item.finishedWeight} гр
          </div>
        ))}
      </div>

      {/* Колонка: Сухой продукт */}
      <div className="flex flex-col gap-y-1">
        <div className="bg-slate-700 p-2 rounded-md font-semibold">Сухой</div>
        {calcProduct.map((item, index) => (
          <div key={index} className="bg-slate-700/50 p-2 rounded-md">
            {item.dryWeight} гр
          </div>
        ))}
      </div>
    </div>
  );
};
