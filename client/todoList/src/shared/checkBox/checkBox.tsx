import React from 'react';

interface ICheckBox{
    onChange:React.ChangeEventHandler<HTMLInputElement>,
    checked:boolean
}

const CheckBox = ({onChange,checked}:ICheckBox) => {

    return (
    <div  className="  w-[40px] flex-shrink-0 ">
  <label className="text-white">
    <input  onChange ={onChange} checked={checked}className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-7 h-7" type="checkbox" />
  </label>
</div>
)
};

export default CheckBox;
