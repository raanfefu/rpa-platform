*** Settings ***
Library   Browser
Library	  OperatingSystem 
| Library | csvLibrary.py


*** Variables ***

${PATH_DOWNLOAD}      /robo/results
${URL}                https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsmulruc/jrmS00Alias    
${SEARCH_FIELD}       //input[@name="txtRuc"]
${BUTTON_ADD}         //button[contains(text(),"Añadir")]
${BUTTON_SUBMIT}      //div[@id="divAcciones"]/div/button[contains(text(),"Enviar")]
${LINK_DOWNLOAD}      //div[@class="panel-body"]/div[@id="divMsg"]/div/a
 
*** Keywords ***

Open Webpage
    New Browser    firefox    headless=true     downloadsPath=/tmp
    New Context    viewport={'width': 1920, 'height': 1080}
    New Page   ${URL}          
 
Search Keywords
    [Arguments]    ${value} 
    Fill text   ${SEARCH_FIELD}         ${value} 
    Click       ${BUTTON_ADD}  

Fill Form Sunat
    [Arguments]    @{value} 
    FOR    ${RUC}    IN    @{value} 
        Search Keywords    ${RUC}
    END
    Click           ${BUTTON_SUBMIT}

Download FileZIP  
    ${promise} =    Promise To Wait For Download 
    Click               ${LINK_DOWNLOAD} 
    ${file_obj}=        Wait For        ${promise}  
    Log                 ${promise}  
    ${str1}=	        Catenate    ${PATH_DOWNLOAD}/${file_obj}[suggestedFilename]
    Copy File           ${file_obj}[saveAs]    ${str1}
    ${output}=	        Run	    unzip ${str1} -d ${PATH_DOWNLOAD}/
    ${output}=	        Run	    rm -rf ${str1}  

Compare Text 
    Get Text    //div/span[@role="heading"]     ==     sdasdasd

*** Task ***

Sunat Download 
    Set Browser Timeout    999999
    @{RUCs2}=    read csv file       /robot/data/data.csv
    Open Webpage 
    Fill Form Sunat    @{RUCs2}
    Download FileZIP
    


 
    
    
    
 
 
 
 
    
     

   
    
    
    
    
 
 
