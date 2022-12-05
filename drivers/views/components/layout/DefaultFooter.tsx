const DefaultFooter = () => {
  return (
    <footer className="flex flex-col justify-center gap-y-3 p-8 text-center">
      <div>(c) 2022 temasaguru</div>
      <div className="text-sm">
        {`当サイトに掲載しているアルバムアートワークは著作権法上の範囲でSpotifyから引用しており、楽曲の権利は提供元に帰属します。`}
        <br className="hidden xl:block" />
        {`当サイトはいかなる広告・解析サービスも使用しておらず、管理画面以外でCookieは使用しておりません。`}
      </div>
    </footer>
  );
};
export default DefaultFooter;
