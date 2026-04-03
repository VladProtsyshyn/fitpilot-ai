import PropTypes from 'prop-types';
import './Layout.css';

function Layout({ children }) {
    return (
        <div className="layout-shell">
            <main>{children}</main>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;