import { Injectable } from "@angular/core";
import { NetworkWrapperHelper } from "../../../helpers/network-wrapper.helper";
import { IProfileRepo } from "../../interfaces/profile.interface";


@Injectable()
export class ProfileV1Hockerized implements IProfileRepo
{

  apiUrl = "https://api.hockerized.com/v1/profile";

  constructor(
    protected networkWrapperHelper: NetworkWrapperHelper
  )
  {
  }

  Get()
  {
    const url = this.apiUrl + '';
    return this.networkWrapperHelper.get<any>({ url: url });
  }
}

