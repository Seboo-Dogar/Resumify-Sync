import React, { useEffect, useRef, useState } from 'react';
import Tabs from '../../components/Tabs';
import { LuCircleCheckBig } from 'react-icons/lu';
import { DUMMY_RESUME_DATA, resumeTemplates, themeColorPalette } from '../../utils/data';
import TemplateCard from '../../components/Cards/TemplateCard';
import RenderResume from '../../components/ResumeTemplates/RenderResume';

const TAB_DATA = [
    {
        label: "Templates",
    },
    {
        label: "Color Palettes",
    }
]

const ThemeSelector = ({selectTheme, setSelectedTheme, resumeData, onClose}) => {
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [tabValue, setTabValue] = useState("Templates");
    const [selectedColorPalette, setSelectedColorPalette] = useState({
        colors: selectTheme?.colorPalette,
        index: -1,
    });
    const [selectedTemplate, setSelectedTemplate] = useState({
        theme: selectTheme?.theme || "",
        index: -1,
    });

    //Handle theme selection
    const handleThemeselection = () => {
        setSelectedTheme({
            colorPalette: selectedColorPalette?.colors,
            theme: selectedTemplate?.theme,
        })
        onClose();
    }

    const upadateBaseWidth = () => {
        if (resumeRef.current) {
            setBaseWidth(resumeRef.current.offsetWidth);
        }
    };

    useEffect(() => {
        upadateBaseWidth();
        window.addEventListener("resize", upadateBaseWidth);
    },[])

  return (
        <div className='container mx-auto px-2 md:px-0'>
            <div className='flex items-center justify-between mb-5 mt-2'>
                <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />
                <button className='btn-small-light' onClick={() => handleThemeselection()}>
                    <LuCircleCheckBig className='text-[16px]' /> Done
                </button>
            </div>

            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-12 md:col-span-5 bg-white'>
                    <div className='grid grid-cols-2 gap-5 max-h-[80vh] overflow-y-scroll custom-scrollbar md:pr-5'>
                        {tabValue === "Templates" &&
                            resumeTemplates.map((template, index) => (
                                <TemplateCard 
                                    key={`template_${index}`}
                                    thumbnailImg={template.thumbnailImg}
                                    isSelected={selectedTemplate?.index === index}
                                    onSelect={() => setSelectedTemplate({ theme: template.id, index})}
                                />
                            ))
                        }
                        {tabValue === "Color Palettes" &&
                            themeColorPalette?.themeOne.map((colors, index) => (
                                <ColorPalette 
                                    key={`palette_${index}`}
                                    colors={colors}
                                    isSelected={selectedColorPalette?.index === index}
                                    onSelect={() => setSelectedColorPalette({ colors, index })}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className='col-span-12 md:col-span-7 bg-white -mt-3' ref={resumeRef}>
                        <RenderResume 
                            templateId={selectedTemplate?.theme || ""}
                            colorPalette={selectedColorPalette?.colors || []}
                            resumeData={resumeData || DUMMY_RESUME_DATA}
                            baseWidth={baseWidth}
                        />
                </div>
            </div>
        </div>
    );
};
export default ThemeSelector;


const ColorPalette = ({colors, isSelected, onSelect}) => {
    return(
        <div className={`h-28 bg-purple-50 flex rounded-lg overflow-hidden border-2 ${
            isSelected ? "border-purple-500" : "border-none"
        }`}>
            {colors.map((color, index) => (
                <div className='flex-1'
                    key={`color_${index}`}
                    style={{backgroundColor: color[index]}}
                    onClick={onSelect}
                ></div>
            ))}
        </div>
    );
};