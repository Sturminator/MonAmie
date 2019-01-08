using System;
using System.Collections.Generic;
using System.Text;

namespace MonAmieData.Models
{
    public class Event
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public int CategoryId { get; set; }
    }
}
