interface TabBarProps {
    children: React.ReactNode;
}

const TabBar = ({children}: TabBarProps) => {
    return (
        <div>
            <h1>Opendigger Info -- Cli Research Tool</h1>
            <hr />
            {children}
        </div>
    )
}

export default TabBar;