
interface SwitchThemeProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SwitchTheme = ({onChange}:SwitchThemeProps) => {
    return (
        <div>

<label className=" mt-2 relative inline-flex items-center cursor-pointer">
  <input className="sr-only peer" type="checkbox"  onChange={onChange}
        defaultChecked={localStorage.getItem("theme") === "dark"}  />
  <div
    className="w-14 h-7 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400
      peer-checked:from-blue-400 peer-checked:to-indigo-500
      transition-all duration-500
      after:content-['☀️'] after:absolute after:top-0.5 after:left-0.5
      after:bg-white after:rounded-full after:h-6 after:w-6
      after:flex after:items-center after:justify-center
      after:transition-all after:duration-500
      peer-checked:after:translate-x-7
      peer-checked:after:content-['🌙']
      after:shadow-md after:text-sm"
  ></div>
</label>
        </div>
    );
};

export default SwitchTheme;
