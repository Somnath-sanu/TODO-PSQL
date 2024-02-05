/* eslint-disable react/prop-types */
function ProgressBar({ progress }) {
  // console.log(progress);

  const colors = ["#BCECE0", "#36EEE0", "#F652A0", "#FA26A0", "#F8D210"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const progressBarStyle = {
    width: `${progress}%`,
    backgroundColor: randomColor,
  };

  return (
    <div className="flex items-center w-full m-4  overflow-hidden justify-start rounded-xl border-2 ">
      <div style={progressBarStyle} className="h-4 rounded-xl"></div>
    </div>
  );
}

export default ProgressBar;
