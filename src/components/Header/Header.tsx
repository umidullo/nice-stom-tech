export interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <header className="bg-white border">
      <div className="p-2 flex justify-between">
        <h1 className="text-xl">[Brand_Name]</h1>
        <p className="text-xl">signIn</p>
      </div>
    </header>
  );
};

export default Header;
