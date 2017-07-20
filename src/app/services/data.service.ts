import { Injectable }  from '@angular/core';

@Injectable()
export class DataService {

getDepartment(){
    return [
       {id: "dev", name: "Development"},
       {id: "QA", name: "Testing"},
       {id: "Arch", name: "Cloud"}
    ]
}

getCategories(){
    return [
        {id: "dev", category: "android", name: "Android"},
        {id: "dev", category: "ios", name: "IOS"},
        {id: "dev", category: "windows", name: "Windows"},
        {id: "dev", category: "java", name: "JAVA"},
        {id: "dev", category: "hybrid", name: "Hybrid"},
        {id: "QA", category: "automation", name: "Automation"},
        {id: "QA", category: "manual", name: "Manual"},
        {id: "QA", category: "testing", name: "Testing"},
        {id: "Arch", category: "cloud", name: "Cloud"},
        {id: "Arch", category: "server", name: "Server"} ]
}

getSkills(){
    return [
        {category: "android", name: "Android"},
        {category: "ios", name: "Objective C"},
        {category: "windows", name: "C#"},
        {category: "java", name: "OOPS"},
        {category: "hybrid", name: "Ionic"},
        {category: "automation", name: "Selenium"},
        {category: "manual", name: "Manual"},
        {category: "testing", name: "Qtp"},
        {category: "cloud", name: "Hadoop"},
        {category: "server", name: "Server"} 
    ]
}

getDomainsData(){
        return[ 
        [
                {
                "domainsData":
                [{"domainName":"Personal Cloud"},{"domainName":"Big Data & Analytics"},{"domainName":"Enterprise"},
                {"domainName":"Messaging"},{"domainName":"Cloud Automation (Activation)"},{"domainName":"Deal Space"}],

                    "categoryData":
                    [
                        {"categoryName":"Programming Languages","skillData":["Java","c++", "Ruby", ".Net","C#", "Groovy"]},
                        {"categoryName":"Workflow","skillData":["BPM", "Drools", "ILOG"]},
                        {"categoryName":"Framework","skillData":["Spring", "Spring Boot", "CXF", "Struts", "JSF", "Jersey", "Hadoop", "Shiro"]}
                        
                    ]
                }
        ]
    ]}
}