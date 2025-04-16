local ESX = nil

-- Wait for ESX
Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Citizen.Wait(0)
    end
end)

-- Main thread to update HUD
Citizen.CreateThread(function()
    while true do
        if ESX ~= nil then
            local playerData = ESX.GetPlayerData()
            -- Get player ID
            local playerId = GetPlayerServerId(PlayerId())
            
            -- Get player stats
            TriggerEvent('esx_status:getStatus', 'hunger', function(status)
                hunger = status.getPercent()
            end)
            
            TriggerEvent('esx_status:getStatus', 'thirst', function(status)
                thirst = status.getPercent()
            end)

            -- Send data to NUI
            SendNUIMessage({
                type = 'updateHUD',
                handCash = playerData.money,
                bankMoney = playerData.bank,
                playerId = playerId,
                hunger = hunger or 100,
                thirst = thirst or 100
            })
        end
        Citizen.Wait(1000) -- Update every second
    end
end)
