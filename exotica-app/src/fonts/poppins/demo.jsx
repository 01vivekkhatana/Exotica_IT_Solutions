import React from 'react';
import './stylesheet.css'; // Make sure you have this CSS file in your project

function Demo() {
    return (
        <>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="noindex, noarchive" />
                <meta name="format-detection" content="telephone=no" />
                <title>Transfonter demo</title>
                <link href="stylesheet.css" rel="stylesheet" />
                <style>
                    {`
                        html, body, div, span, applet, object, iframe,
                        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
                        a, abbr, acronym, address, big, cite, code,
                        del, dfn, em, img, ins, kbd, q, s, samp,
                        small, strike, strong, sub, sup, tt, var,
                        b, u, i, center,
                        dl, dt, dd, ol, ul, li,
                        fieldset, form, label, legend,
                        table, caption, tbody, tfoot, thead, tr, th, td,
                        article, aside, canvas, details, embed,
                        figure, figcaption, footer, header, hgroup,
                        menu, nav, output, ruby, section, summary,
                        time, mark, audio, video {
                            margin: 0;
                            padding: 0;
                            border: 0;
                            font-size: 100%;
                            font: inherit;
                            vertical-align: baseline;
                        }
                        /* HTML5 display-role reset for older browsers */
                        article, aside, details, figcaption, figure,
                        footer, header, hgroup, menu, nav, section {
                            display: block;
                        }
                        body {
                            line-height: 1;
                        }
                        ol, ul {
                            list-style: none;
                        }
                        blockquote, q {
                            quotes: none;
                        }
                        blockquote:before, blockquote:after,
                        q:before, q:after {
                            content: '';
                            content: none;
                        }
                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }
                        /* demo styles */
                        body {
                            background: #f0f0f0;
                            color: #000;
                        }
                        .page {
                            background: #fff;
                            width: 920px;
                            margin: 0 auto;
                            padding: 20px 20px 0 20px;
                            overflow: hidden;
                        }
                        .font-container {
                            overflow-x: auto;
                            overflow-y: hidden;
                            margin-bottom: 40px;
                            line-height: 1.3;
                            white-space: nowrap;
                            padding-bottom: 5px;
                        }
                        h1 {
                            position: relative;
                            background: #444;
                            font-size: 32px;
                            color: #fff;
                            padding: 10px 20px;
                            margin: 0 -20px 12px -20px;
                        }
                        .letters {
                            font-size: 25px;
                            margin-bottom: 20px;
                        }
                        .s10:before {
                            content: '10px';
                        }
                        .s11:before {
                            content: '11px';
                        }
                        .s12:before {
                            content: '12px';
                        }
                        .s14:before {
                            content: '14px';
                        }
                        .s18:before {
                            content: '18px';
                        }
                        .s24:before {
                            content: '24px';
                        }
                        .s30:before {
                            content: '30px';
                        }
                        .s36:before {
                            content: '36px';
                        }
                        .s48:before {
                            content: '48px';
                        }
                        .s60:before {
                            content: '60px';
                        }
                        .s72:before {
                            content: '72px';
                        }
                        .s10:before, .s11:before, .s12:before, .s14:before,
                        .s18:before, .s24:before, .s30:before, .s36:before,
                        .s48:before, .s60:before, .s72:before {
                            font-family: Arial, sans-serif;
                            font-size: 10px;
                            font-weight: normal;
                            font-style: normal;
                            color: #999;
                            padding-right: 6px;
                        }
                        pre {
                            display: block;
                            padding: 9px;
                            margin: 0 0 12px;
                            font-family: Monaco, Menlo, Consolas, "Courier New", monospace;
                            font-size: 13px;
                            line-height: 1.428571429;
                            color: #333;
                            font-weight: normal;
                            font-style: normal;
                            background-color: #f5f5f5;
                            border: 1px solid #ccc;
                            overflow-x: auto;
                            border-radius: 4px;
                        }
                        /* responsive */
                        @media (max-width: 959px) {
                            .page {
                                width: auto;
                                margin: 0;
                            }
                        }
                    `}
                </style>
            </head>
            <body>
                <div className="page">
                    <div className="demo">
                        <h1 style={{ fontFamily: 'Poppins', fontWeight: 600, fontStyle: 'normal' }}>Poppins SemiBold</h1>
                        <pre title="Usage">{`.your-style {\n  font-family: 'Poppins';\n  font-weight: 600;\n  font-style: normal;\n}`}</pre>
                        <pre title="Preload (optional)">
                            &lt;link rel=&quot;preload&quot; href=&quot;Poppins-SemiBold.ttf&quot; as=&quot;font&quot; type=&quot;font/ttf&quot; crossorigin&gt;
                        </pre>
                        <div className="font-container" style={{ fontFamily: 'Poppins', fontWeight: 600, fontStyle: 'normal' }}>
                            <p className="letters">
                                abcdefghijklmnopqrstuvwxyz<br />
                                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                                0123456789.:,;()*!?'@#&lt;&gt;$%&^+-=~
                            </p>
                            <p className="s10" style={{ fontSize: '10px' }}>The quick brown fox jumps over the lazy dog.</p>
                            <p className="s11" style={{ fontSize: '11px' }}>The quick brown fox jumps over the lazy dog.</p>
                            <p className="s12" style={{ fontSize: '12px' }}>The quick brown fox jumps over the lazy dog.</p>
                            <p className="s14" style={{ fontSize: '14px' }}>The quick brown fox jumps over the lazy dog.</p>
                            <p className="s18" style={{ fontSize: '18px' }}>The quick brown fox jumps over the lazy dog.</p>
                            <p className="s24" style={{ fontSize: '24px' }}>The quick brown fox jumps over the lazy dog.</p>
                            <p className="s30" style={{ fontSize: '30px' }}>The quick brown fox jumps over the lazy dog.</p>
                            <p className="s36" style={{ fontSize: '36px' }}>The quick brown fox jumps over the lazy dog.</p>
                            <p className="s48" style={{ fontSize: '48px' }}>The quick brown fox jumps over the lazy dog.</p>
                            <p className="s60" style={{ fontSize: '60px' }}>The quick brown fox jumps over the lazy dog.</p>
                            <p className="s72" style={{ fontSize: '72px' }}>The quick brown fox jumps over the lazy dog.</p>
                        </div>
                    </div>

                    {/* Repeat the above block for other font weights like Bold, Black, etc. */}
                </div>
            </body>
        </>
    );
}

export default Demo;