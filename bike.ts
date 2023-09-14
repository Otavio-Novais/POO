import fetch from 'node-fetch';

export class Bike
 {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public id?: string
    ) {}    

    //Test
    async Location(){
        const url = 'https://api.ipdata.co?api-key=b60bc829eeef22f1fb67ee109e614d2a277389dc04563634e8c96348&&fields=city,region,country_name,continent_name,latitude,longitude';

        try {
            // Make the GET request
            const response = await fetch(url);

            // Check if the request was successful
                if (!response.ok) {
                    throw new Error('HTTP error ' + response.status);
                }

            // Parse the JSON from the response
            const data = await response.json();

                // Log the data
            console.log(data);
            
            } catch (error) {
                // Log any errors
            console.log(error);
            }
        }

 }


 
