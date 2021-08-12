using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoAppWithSignalR.Hubs
{
    public class TodoHub : Hub
    {
        public async Task AddTask(string task)
        {
            await Clients.All.SendAsync("ReceiveTask", task);
        }
    }
}
