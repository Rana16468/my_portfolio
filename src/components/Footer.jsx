import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            fontFamily: "'DM Sans', sans-serif",
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
            color: '#e2e8f0',
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
        }}>
            {/* Image Column */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
                <img
                    src="https://cdn-employer-wp.arc.dev/wp-content/uploads/2022/04/software-development-costs-1128x635.jpg"
                    alt=""
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55, mixBlendMode: 'luminosity' }}
                />
            </div>

            {/* Content Column */}
            <div style={{ padding: '52px 52px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    {/* Contact */}
                    <div>
                        <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#90cdf4', margin: '0 0 6px' }}>Call us</p>
                        <a href="tel:01722305054" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#fff', textDecoration: 'none', display: 'block' }}>
                            01722305054
                        </a>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                            <li style={{ fontSize: '12.5px', color: '#a0aec0', padding: '3px 0' }}>Monday to Friday: 10am – 5pm</li>
                            <li style={{ fontSize: '12.5px', color: '#a0aec0', padding: '3px 0' }}>Weekend: 10am – 3pm</li>
                        </ul>
                        {/* Social icons here */}
                    </div>

                 
                </div>

                {/* Bottom */}
                <div>
                    <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(144,205,244,0.2), transparent)', margin: '32px 0 20px' }} />
                    <p style={{ fontSize: '11.5px', color: '#718096', margin: 0 }}>© 2023. MyName. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;