interface TabBarProps {
    children: React.ReactNode;
}

const TabBar = ({ children }: TabBarProps) => {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="logo2.png" alt="Opendigger Logo" style={{ width: '190px', marginTop: '8px', marginLeft: '4px' }} />
            </div>
            <hr />
            {children}
        </div>
    )
}

export default TabBar;