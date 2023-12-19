import PlaceholderLoading from 'react-placeholder-loading';

function Loading() {
  return (
    <div className="flex flex-col items-center gap-2">
      <PlaceholderLoading shape="rect" width={800} height={30} />
      <PlaceholderLoading shape="rect" width={800} height={30} />
      <PlaceholderLoading shape="rect" width={800} height={30} />
      <PlaceholderLoading shape="rect" width={800} height={30} />
    </div>
  );
}

export default Loading;
