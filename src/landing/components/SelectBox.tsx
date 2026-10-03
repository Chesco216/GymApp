import "./SelectBox.css";

export interface SelectOption {
  key: number;
  value: number;
  text: string;
}

interface SelectBoxProps {
  title: string;
  options: SelectOption[];
}

export const SelectBox = ({ title, options }: SelectBoxProps) => {
  return (
    <>
      <label className='input-label-calc'>{title}</label>
      <select name='actBox' className='select-box-component'>
        {
          options.map( option => {
            return (
              <option key={option.key} value={option.value}>{option.text}</option>
            )
          })
        }
      </select>
    </>
  )
}
