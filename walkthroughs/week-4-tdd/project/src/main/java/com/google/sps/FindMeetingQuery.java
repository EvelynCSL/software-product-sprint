// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    // throw new UnsupportedOperationException("TODO: Implement this method.");
    final long MINUTES_IN_A_DAY = 1440;
    final int START_OF_DAY = TimeRange.START_OF_DAY;
    final int END_OF_DAY = TimeRange.END_OF_DAY;
    int endOfTimeRange = 0;
    TimeRange previousTimeRange = TimeRange.fromStartEnd(0,0,true);
    Collection<TimeRange> unavailableTimeRange = new ArrayList<>();
    Collection<TimeRange> unavailableNoOverlap = new ArrayList<>();
    Collection<TimeRange> returnCollection = new ArrayList<>();

    long durationOfRequest = request.getDuration();
    Collection<String> attendeesOfRequest = request.getAttendees();

    if(attendeesOfRequest.isEmpty()){
      return Arrays.asList(TimeRange.WHOLE_DAY);
    }else if(durationOfRequest > MINUTES_IN_A_DAY){
      return Arrays.asList();
    }else{
      for(String attendee : attendeesOfRequest){
        for(Event event : events){
          if(event.getAttendees().contains(attendee)){
            unavailableTimeRange.add(event.getWhen());
          }
        }
      }
      for(TimeRange timerange : unavailableTimeRange){
        if(previousTimeRange.contains(timerange)){
        }else if(previousTimeRange.overlaps(timerange)){
          TimeRange newTimeRange = TimeRange.fromStartEnd(previousTimeRange.start(),timerange.end(),false);
          unavailableNoOverlap.add(newTimeRange);
          unavailableNoOverlap.remove(previousTimeRange);
          previousTimeRange = newTimeRange;
        }else{
          unavailableNoOverlap.add(timerange);
          previousTimeRange = timerange;
        }
      }
      for(TimeRange timerange : unavailableNoOverlap){
        if(endOfTimeRange == 0){
          TimeRange trval = TimeRange.fromStartEnd(START_OF_DAY,timerange.start(),false);
          if(trval.duration() != 0 && trval.duration() >= durationOfRequest){
            returnCollection.add(trval);
          }
        }else{
          TimeRange trval = TimeRange.fromStartEnd(endOfTimeRange,timerange.start(),false);
          if(trval.duration() != 0 && trval.duration() >= durationOfRequest){
            returnCollection.add(trval);
          }
        }
        endOfTimeRange = timerange.end();
      }
      TimeRange trval = TimeRange.fromStartEnd(endOfTimeRange,END_OF_DAY,true);
      if(trval.duration() != 0 && trval.duration() >= durationOfRequest){
        returnCollection.add(trval);
      }
    }
    return returnCollection;
  }
}
