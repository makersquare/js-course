
Very rough API documentation
============================

How to get a case to investigate
--------------------------------

* URL : `/FBI/API/case`.
* Method: GET.
* Response example:
```
"{
  "caseName":"Missed cookies",
  "evidences":[
    {
      "evidenceType":"gun",
      "evidenceDescription":"A knife on the crime scene"
    }
  ]
}"
```
How to order to interview a witness
-----------------------------------

* URL : `/FBI/API/interview`.
* Method: POST.
* Call params:
  * caseId : the id of the case you are investigating. 
  * who : a reference to know who to interview. (ej. 'Truck drivers declarations.').
* Response example:
```
{
  "conslusion" : "Regular burglar",
  "interviewDuration" : "15min",
  "interviewLocation" : "John's restaurant",
  "accuracy" : 0.99,
  "weight" : 5
}

```
* Where:
  * "weight" is how importnat is this evidence for the investigation.
  * "accuracy" is how acurate are the results.

How to order to examine evidence
---------------------------------

* URL : `/FBI/API/itemLaboratory`.
* Method: POST.
* Call params:
  * caseId : the id of the case you are investigating. 
  * what : a reference to know what to analyze. (ej. 'Shoe prints on the ground.').
* Response example:
```
{
  "conslusion" : "Very common sport shoes.",
  "comment" : "Nothing unusual",
  "analysisDuration" : "2h",
  "accuracy" : 0.55,
  "weight" : 1
}

```
* Where:
  * "weight" is how importnat is this evidence for the investigation.
  * "accuracy" is how acurate are the results.

How to get a medical analysis
----------------------------------

* URL : `/FBI/API/medicalAnalysis`.
* Method: POST.
* Call params:
  * caseId : the id of the case you are investigating. 
  * what : a reference to know what to analyze. (ej. 'Some people got shot.').
* Response example:
```
{
  "Dr." : "Dree",
  "numberOfExaminations" : 15,
  "conclusion" : "They used a 9mm",
  "comment" : "The victims are lucky to be alive."
  "accuracy" : 0.99,
  "weight" : 10
}

```
* Where:
  * "weight" is how importnat is this evidence for the investigation.
  * "accuracy" is how acurate are the results.

How to order to examine media evidence
--------------------------------------

* URL : `/FBI/API/mediaLaboratory`.
* Method: POST.
* Call params:
  * caseId : the id of the case you are investigating. 
  * what : a reference to know what to analyze. (ej. 'Weird phone calls.').
* Response example:
```
{
  "conslusion" : "Pranksters children.",
  "analysisDuration" : "30min",
  "accuracy" : 0.95,
  "weight" : 1
}

```
* Where:
  * "weight" is how importnat is this evidence for the investigation.
  * "accuracy" is how acurate are the results.
  
Get a suspects list
-------------------

* URL : `/FBI/API/suspectsList`.
* Method: GET.
* Call params:
  * caseId : the id of the case you are investigating. 
  * characteristics : Necessary characteristics to get a suspect list from FBI database. (ej. 'Just a weird guy.').
* Response example:
```
[
  {
    "s_id" : 1,
    "name" : "Mr. Corleone"
  }
]
```
* Where:
  * "s_id" is the Id of the suspect on the FBI database.

How to get the score of a suspect 
---------------------------------

* URL : `/FBI/API/calculateScore`.
* Method: POST.
* Call params:
  * caseId : the id of the case you are investigating. 
  * rankInput : The data to calculate the score:
    * accuracy
    * weight
* Response example:
```
{    
  "result" : 1.56
}
```
