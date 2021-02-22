export interface Photos {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_data: Date;
  rover: {
    id: number;
    name: string;
    landing_date: Date;
    launch_date: Date;
    status: string;
  }
}


