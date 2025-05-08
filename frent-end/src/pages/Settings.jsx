import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { currentTheme, changeTheme, themes } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8 "   >
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <div className=" rounded-lg shadow-md overflow-hidden mb-6" style={ { backgroundColor: themes.cardBg } }>
        <div className="border-b border-gray-200 px-6 py-4">
          <h4 className="text-xl font-semibold">Theme Settings</h4>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            { Object.entries(themes).map(([themeKey, theme]) => (
              <div
                key={ themeKey }
                className={ `rounded-lg overflow-hidden border-2 transition-all ${currentTheme === themeKey
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300'
                  }` }
                style={ {
                  backgroundColor: theme.cardBg,
                } }
              >
                <div className="p-4">
                  <div
                    className="rounded-lg mb-4 overflow-hidden"
                    style={ {
                      height: '100px',
                      backgroundColor: theme.background,
                      border: `1px solid ${theme.border}`,
                    } }
                  >
                    <div
                      style={ {
                        width: '30%',
                        height: '20px',
                        backgroundColor: theme.primary,
                        margin: '10px',
                        borderRadius: '4px'
                      } }
                    />
                    <div
                      style={ {
                        width: '60%',
                        height: '10px',
                        backgroundColor: theme.text,
                        margin: '10px',
                        borderRadius: '4px',
                        opacity: 0.7
                      } }
                    />
                  </div>
                  <h5 className="text-lg font-medium text-center mb-4 text-gray-300">{ theme.name }</h5>
                  <button
                    className={ `w-full py-2 px-4 rounded-md transition-colors ${currentTheme === themeKey
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'border border-blue-500 text-blue-500 hover:bg-blue-50'
                      }` }
                    onClick={ () => changeTheme(themeKey) }
                  >
                    { currentTheme === themeKey ? 'Active' : 'Select Theme' }
                  </button>
                </div>
              </div>
            )) }
          </div>
        </div>
      </div>
    </div >
  );
};

export default Settings; 